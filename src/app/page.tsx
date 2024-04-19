import { validateRequest } from "@/lib/auth";
import { Button, ButtonGroup } from "@nextui-org/react";
import { ThemeSwitcher } from "@/components/common/ThemeSwitcher";
import Link from "next/link";
import { checkExistingUser } from "@/db/db-queries";
import { logout } from "./(auth)/actions";

export default async function Home() {
  const { user } = await validateRequest();
  const userDetail = user ? await checkExistingUser(user.email) : null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-sky-50">
      <div className="max-w-2xl flex flex-col items-center gap-8">
        <ThemeSwitcher />

        {user && userDetail ? (
          <>
            <h1 className="text-4xl font-bold">
              <span className="text-blue-600">{user.email}</span>
            </h1>
            <p className="text-lg ">
              Welcome back! {userDetail?.name?.split(" ")[0] || user.email}
              <br />
              <br />
              It&apos;s great to see you again. With Lucia-Auth securing your session, you can explore our platform with
              confidence. Whether you&apos;re browsing content, making purchases, or engaging with our community, your
              experience is protected every step of the way.
              <br />
              <br />
              Thank you for choosing us as your trusted platform. Together, let&apos;s make the most of your journey
              here.
            </p>
            <form className="w-full" action={logout}>
              <Button size="lg" fullWidth type="submit" color="danger">
                Sign out
              </Button>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold">
              <span className="text-blue-600">Hello</span> World
            </h1>
            <p className="text-lg ">
              Welcome to our project, where we harness the power of Lucia-Auth and Drizzle ORM to create a seamless and
              secure user authentication system. With Lucia-Auth, user authentication becomes a breeze, offering robust
              features for login, registration, and session management. Meanwhile, Drizzle ORM empowers us to interact
              with our database effortlessly, ensuring efficient data handling and retrieval. <br />
              <br /> Together, Lucia-Auth and Drizzle ORM form the backbone of our project, providing a solid foundation
              for building user-centric applications. Whether you&apos;re developing a personal blog, an e-commerce
              platform, or a social networking site, our tools are here to streamline your development process and
              enhance the security of your application.
              <br />
              <br /> Join us on this journey as we unlock the potential of Lucia-Auth and Drizzle ORM, paving the way
              for innovative and secure web solutions. Let&apos;s build something amazing together!
              <br />
              <br />
              You are currently not logged in. Please log in or register to access the project.
            </p>
            <ButtonGroup fullWidth size="lg" color="primary">
              <Button variant="ghost">
                <Link href="/login">Log in</Link>
              </Button>
              <Button variant="solid">
                <Link href="/signup">Register</Link>
              </Button>
            </ButtonGroup>
          </>
        )}
      </div>
    </main>
  );
}

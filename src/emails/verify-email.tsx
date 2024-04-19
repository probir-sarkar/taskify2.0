import { Body, Button, Container, Head, Html, Img, Link, Preview, Section, Text } from "@react-email/components";
import * as React from "react";

interface ResetPasswordEmailProps {
  userFirstname?: string;
  verifyEmailLink?: string;
  email?: string;
}

const VerifyEmail = ({ userFirstname, verifyEmailLink, email }: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verify Your Email Address for Taskify!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={text}>Hi {userFirstname},</Text>
            <Text style={text}>
              Thank you for choosing Taskify! We just received a request to verify your email address {email}. To
              complete the process and ensure the security of your account, please click the button below:
            </Text>
            <Button style={button} href={verifyEmailLink}>
              Verify Email
            </Button>
            <Text style={text}>
              If you didn&apos;t make this request or you believe it&apos;s in error, you can safely ignore this
              message. Your account security is important to us, so rest assured that no changes will be made unless you
              verify your email address.
            </Text>
            <Text style={text}>To keep your account secure, please don&apos;t forward this email to anyone.</Text>
            <Text style={text}>
              Best regards,<br></br> The Taskify Team
            </Text>
            {/* <Text style={text}>The Taskify Team</Text> */}
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default VerifyEmail;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const anchor = {
  textDecoration: "underline",
};

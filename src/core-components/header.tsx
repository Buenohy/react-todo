import Container from '../components/container';
import Logo from '../assets/images/logo.svg?react';
import ThemeToggle from '../components/theme-toggle';

export default function Header() {
  return (
    <Container
      as="header"
      className="mt-3 md:mt-20 flex items-center justify-between"
    >
      <Logo className="h-9 md:h-12" />
      <ThemeToggle />
    </Container>
  );
}

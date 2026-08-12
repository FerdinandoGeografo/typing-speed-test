export default function Logo() {
  return (
    <picture>
      <source media="(min-width: 640px)" srcSet="logo-large.svg" />
      <img src="logo-small.svg" alt="Typing speed test logo" />
    </picture>
  );
}

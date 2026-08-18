export default function Logo() {
  return (
    <picture>
      <source
        media="(min-width: 640px)"
        srcSet="logo-large.svg"
        width="267"
        height="40"
      />
      <img src="logo-small.svg" alt="Typing speed test logo" sizes="32x32" />
    </picture>
  );
}

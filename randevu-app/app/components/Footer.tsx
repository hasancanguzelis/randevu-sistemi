interface FooterProps {
  adres: string;
}

export default function Footer({ adres }: FooterProps) {
  return (
    <footer>
      <p>Adres: {adres}</p>
    </footer>
  );
}

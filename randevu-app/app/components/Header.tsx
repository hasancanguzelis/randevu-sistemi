interface HeaderProps {
  baslik: string;
  aciklama: string;
}

export default function Header({ baslik, aciklama }: HeaderProps) {
  return (
    <header>
      <h1>{baslik}</h1>
      <p>{aciklama}</p>
    </header>
  );
}

class Pianta {
  id: number; // utile per il database
  nome: string;
  specie: string;
  dataAcquisizione: Date;
  categoria: string;
  stato: 'sana' | 'da controllare' | 'malata';
  fotoUri: string; // percorso/uri della foto salvata
  frequenzaInnaffiatura: number; // in giorni
  frequenzaPotatura: number; // in giorni
  frequenzaRinvaso: number; // in giorni
  note: string;

  constructor(
    id: number,
    nome: string,
    specie: string,
    dataAcquisizione: Date,
    categoria: string,
    stato: 'sana' | 'da controllare' | 'malata',
    fotoUri: string,
    frequenzaInnaffiatura: number,
    frequenzaPotatura: number,
    frequenzaRinvaso: number,
    note: string
  ) {
    this.id = id;
    this.nome = nome;
    this.specie = specie;
    this.dataAcquisizione = dataAcquisizione;
    this.categoria = categoria;
    this.stato = stato;
    this.fotoUri = fotoUri;
    this.frequenzaInnaffiatura = frequenzaInnaffiatura;
    this.frequenzaPotatura = frequenzaPotatura;
    this.frequenzaRinvaso = frequenzaRinvaso;
    this.note = note;
  }
}

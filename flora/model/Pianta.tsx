// Interfaccia per la Pianta
interface IPianta {
  id: 'Integer'; // utile per il database
  nome: Text;
  specie: Text;
  dataAcquisizione: Text;
  categoria: Text;
  stato: Text;
  foto: Text;
  ultimaInnaffiatura: 'Intger';
  frequenzaInnaffiatura: 'Integer';
  frequenzaPotatura: 'Integer';
  frequenzaRinvaso: 'Integer';
  note: Text;
}


class Pianta implements IPianta {
  id: 'Integer'; // utile per il database
  nome: Text;
  specie: Text;
  dataAcquisizione: Text;
  categoria: Text;
  stato: Text;
  foto: Text;
  ultimaInnaffiatura: 'Intger';
  frequenzaInnaffiatura: 'Integer';
  frequenzaPotatura: 'Integer';
  frequenzaRinvaso: 'Integer';
  note: Text;

  constructor(
      id: 'Integer', // utile per il database
      nome: Text,
      specie: Text,
      dataAcquisizione: Text,
      categoria: Text,
      stato: Text,
      foto: Text,
      ultimaInnaffiatura: 'Intger',
      frequenzaInnaffiatura: 'Integer',
      frequenzaPotatura: 'Integer',
      frequenzaRinvaso: 'Integer',
      note: Text,
  ) {
    this.id = id;
    this.nome = nome;
    this.specie = specie;
    this.dataAcquisizione = dataAcquisizione;
    this.categoria = categoria;
    this.stato = stato;
    this.foto = foto;
    this.ultimaInnaffiatura = ultimaInnaffiatura;
    this.frequenzaInnaffiatura = frequenzaInnaffiatura;
    this.frequenzaPotatura = frequenzaPotatura;
    this.frequenzaRinvaso = frequenzaRinvaso;
    this.note = note;
  }
}
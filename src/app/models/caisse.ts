// this model hold the caisse data comming from the server
export interface Caisse {
  caisseID?: number;
  libelle?: string;
  amountIn?: number;
  amountOut?: number;
  operationDate?: Date;
  solde?: number;
}

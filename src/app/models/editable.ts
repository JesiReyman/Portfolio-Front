export interface Editable{
    nombre: string;
    id: number;

    getId(): number
    
    delete(id:number): boolean

    edit( data: Editable):boolean

    add( data: Editable):boolean
     
}
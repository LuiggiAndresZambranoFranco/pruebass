import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClienteService {

  private clientes: Cliente[] = [
    {
      id:1, nombre:'Luiggi' , cedula: '1359182346', edad: '22', estado:true
    },
    {
      id:2, nombre:'Valeria' , cedula: '1301042235', edad: '21',estado:true
    },
  ]

  create(createClienteDto: CreateClienteDto) {
    const cliente = new Cliente();
    cliente.id=  Math.max( ... this.clientes.map(elemento => elemento.id),0 )+1 ;
    cliente.nombre= createClienteDto.nombre;
    this.clientes.push(cliente);
    return cliente;
  }

  findAll() : Cliente[] {
    return this.clientes;
  }

  findOne(id: number) {
    const cliente =  this.clientes.find(cliente=> cliente.id===id);
    if (!cliente) throw new NotFoundException(`ID ${id} not found`)
    return cliente;
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    const { nombre, cedula, edad, estado } = updateClienteDto;
    const cliente = this.findOne(id);
    if (nombre) cliente.nombre = nombre;
    if (cedula) cliente.cedula = cedula;
    if (edad) cliente.edad = edad;
    if (estado!= undefined) cliente.estado = estado;

    this.clientes =  this.clientes.map( elemento=> {
      if (elemento.id===id) return cliente;
      return elemento;
    } )

    return cliente;

  }

  remove(id: number) {
    this.findOne(id);
    this.clientes =  this.clientes.filter(elemento=> elemento.id!== id);
  }
}

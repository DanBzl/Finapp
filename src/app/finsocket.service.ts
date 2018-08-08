import { Injectable } from '@angular/core';
import io from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class FinsocketService {
  socket = io('http://localhost');

  constructor() { }


  emit(data){
    this.socket.emit('chat message', data);
  }




}

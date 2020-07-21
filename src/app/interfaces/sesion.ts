import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { firestore } from 'firebase';

export interface Sesion {
    capacidad: number,
    restantes: number,
    startTime: Date,
    endTime: Date,
    title: string
}

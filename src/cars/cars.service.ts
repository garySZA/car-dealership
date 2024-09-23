import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';



@Injectable()
export class CarsService {
    private cars: Car[] = [
        // {
        //     id: uuid(),
        //     brand: 'Toyota',
        //     model: 'Corolla'
        // }
    ]

    findAll() {
        return this.cars;
    }

    findOneById( id: string ){
        const car = this.cars.find( car => car.id === id );

        if( !car ){
            throw new NotFoundException(`Card with id ${id} not found`);
        }

        return car;
    }

    create( createCarDto: CreateCarDto ) {
        const newCar: Car = {
            id: uuid(),
            ...createCarDto
        }

        this.cars.push( newCar );
        
        return newCar
    }

    update( id: string, updateCarDto: UpdateCarDto ) {
        let carDB = this.findOneById( id );

        this.cars.map( car => {
            if( car.id === id ){
                carDB = {
                    ...carDB,
                    ...updateCarDto,
                    id,
                }

                return carDB;
            }

            return car;
        })

        return carDB;

    }

    delete( id: string ){
        const car = this.findOneById( id );

        this.cars.filter( car => car.id !== id );
    }

    fillCarsWithSeedData ( cars: Car[] ){
        this.cars = cars;
    }
}

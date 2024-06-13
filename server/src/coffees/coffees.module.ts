import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeController } from 'src/coffees/coffee.controller';
import { CoffeeService } from 'src/coffees/coffee.service';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/events/entities/event.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeeController],
  providers: [CoffeeService],
})
export class CoffeesModule {}

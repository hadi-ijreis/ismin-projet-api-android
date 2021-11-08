import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { Crous } from './crous';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import { RootObject, Record, Fields } from './ExternalCrous';
import { response } from 'express';

@Injectable()
export class CrousService implements OnModuleInit {
    private readonly crousMap = new Map<string, Crous>();
    private readonly logger = new Logger(CrousService.name);


    constructor(private readonly httpService: HttpService){}
     

    async onModuleInit(): Promise<void>{
        const dataset = await readFile('src/dataset.json', 'utf8');
        const url: string = 'https://data.opendatasoft.com/api/records/1.0/search/?dataset=fr_crous_restauration_france_entiere%40mesr&q=&rows=150';
        
        //Read file then convert content to Crous[]
        const fileCrous = (JSON.parse(dataset) as any[]).map((crousFromFile) =>{
            const convertedCrous: Crous = {
                id: crousFromFile.id,
                type: crousFromFile.type,
                zone: crousFromFile.zone,
                title: crousFromFile.title, 
                photo: crousFromFile.photo,
                short_desc: crousFromFile.short_desc,
                geolocalisation: crousFromFile.short_desc,
                contact: crousFromFile.contact,
                closing: crousFromFile.closing,
                infos: crousFromFile.infos,
                favorite: false,
            };

            return convertedCrous;
        });

        
        /*
        this.httpService
           .get<Record[]>(url)
           .pipe(
               map((response) =>{
                console.log("abbas");
                return response;
               }), 
               catchError(
           );
           */


        //Call external API and then convert content to Crous[]
        const externalCrous: Crous[] = await firstValueFrom(
            this.httpService
                .get<Record[]>(url)
                
                .pipe(
                    map((response) =>
                        response.data["records"].map((externalCrous) => ({
                        id: externalCrous.fields.id,
                        type: externalCrous.fields.type,
                        zone: externalCrous.fields.zone,
                        title: externalCrous.fields.title, 
                        photo: externalCrous.fields.photo,
                        short_desc: externalCrous.fields.short_desc,
                        geolocalisation: externalCrous.fields.geolocalisation,
                        contact: externalCrous.fields.contact,
                        closing: externalCrous.fields.closing,
                        infos: externalCrous.fields.infos,
                        favorite: false,
                        })),
                    ),
                ),
                
        );

        //this.logger.log(externalCrous.toString());
       [...fileCrous, ...externalCrous].forEach((Crous) => this.addCrous(Crous));
        //[...fileCrous, ...externalCrous].forEach((Crous) => this.addCrous(Crous));
        this.logger.log(`There are ${this.crousMap.size} Crous locations available`)
    }
    addCrous(crous: Crous): void {
        this.crousMap.set(crous.id, crous);
    }

    getCrous(id: string): Crous{
        const foundCrous = this.crousMap.get(id);

        if(!foundCrous){
            throw new Error(`No Crous location with the id ${id}`);
        }

        return foundCrous;
    }

    setFavorite(id: string, crous: Crous): Crous{
        crous.favorite = true;
        this.addCrous(crous);
        return crous;
    }

    getAllCrous(): Crous[]{
        return Array.from(this.crousMap.values()).sort((crous1, crous2) =>
        crous1.id.localeCompare(crous2.id),
        );
    }

    getCrousByType(type: string): Crous[]{
        return this.getAllCrous().filter((crous) => {
            return crous.type === type;
        });
    }

    getTotalNumberOfCrous(): number{
        return this.crousMap.size;
    }

    deleteCrous(id: string): void{
        this.crousMap.delete(id);
    }

    searchByIdAndType(term: string): Crous[]{
        const escapedTerm = term.toLowerCase().trim();

        return this.getAllCrous().filter((crous) =>{
            return(
                crous.id.toLowerCase().includes(escapedTerm) ||
                crous.type.toLowerCase().includes(escapedTerm)
            );
        });
    }
}

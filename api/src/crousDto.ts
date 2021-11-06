import { IsNotEmpty, IsArray } from 'class-validator';

export class CrousDto {
    @IsNotEmpty()
    readonly id: string;

    @IsNotEmpty()
    readonly type: string;

    @IsNotEmpty()
    readonly zone: string;

    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly photo: string;

    @IsNotEmpty()
    readonly short_desc: string;

    @IsNotEmpty()
    @IsArray()
    readonly geolocalisation: number[];

    @IsNotEmpty()
    readonly contact: string;

    @IsNotEmpty()
    readonly closing: number;
    
    @IsNotEmpty()
    readonly infos: string;
}
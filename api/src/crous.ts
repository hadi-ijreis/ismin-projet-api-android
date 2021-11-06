export interface Crous{
    readonly id: string;
    readonly type: string;
    readonly zone: string;
    readonly title: string;
    readonly photo: string;
    readonly short_desc: string;
    readonly geolocalisation: number[];
    readonly contact: string;
    readonly closing: number;
    readonly infos: string;
}
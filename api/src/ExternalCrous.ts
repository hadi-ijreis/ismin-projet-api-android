    export interface Parameters {
        dataset: string[];
        timezone: string;
        rows: number;
        start: number;
        format: string;
        facet: string[];
    }

    export interface Fields {
        zone: string;
        title: string;
        photo: string;
        short_desc: string;
        id: string;
        geolocalisation: number[];
        contact: string;
        lat: number;
        closing: number;
        type: string;
        infos: string;
    }

    export interface Geometry {
        type: string;
        coordinates: number[];
    }

    export interface Record {
        datasetid: string;
        recordid: string;
        fields: Fields;
        geometry: Geometry;
        record_timestamp: Date;
    }

    export interface Facet {
        count: number;
        path: string;
        state: string;
        name: string;
    }

    export interface FacetGroup {
        facets: Facet[];
        name: string;
    }

    export interface RootObject {
        nhits: number;
        parameters: Parameters;
        records: Record[];
        facet_groups: FacetGroup[];
    }




/*

export interface ExternalCrous{
    readonly id: string;
    readonly type: string;
    readonly zone: string;
    readonly title: string;
    readonly photo: string;
    readonly short_desc: string;
    readonly geolocalisation: number[];
    readonly contact: string;
    readonly closing: boolean;
    readonly infos: string;

}
*/
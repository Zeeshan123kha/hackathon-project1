import { StaticImport } from "next/dist/shared/lib/get-img-props";


export interface Product {
    _rev: string;

    imageUrl: string | StaticImport;
    _id: string;
    title: string;
    _type : 'product';
    image : {
        asset : {
            ref : string;
            _type : 'image';
        }
    };
    price : number;
    description? : string;
    slug : {
        _type : 'slug';
        current : string;
    };
    inventory : number;
}
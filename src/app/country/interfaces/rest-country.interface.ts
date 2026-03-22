export interface ResCountry {
    tld:          string[];
    cca2:         string;
    ccn3:         string;
    cca3:         string;
    cioc?:        string;
    independent:  boolean;
    status:       Status;
    unMember:     boolean;
    idd:          Idd;
    capital:      string[];
    altSpellings: string[];
    region:       string;
    subregion?:   string;
    landlocked:   boolean;
    borders?:     string[];
    area:         number;
    maps:         Maps;
    population:   number;
    fifa?:        string;
    car:          Car;
    timezones:    string[];
    continents:   string[];
    flag:         string;
    name:         Name;
    currencies:   { [key: string]: Currency };
    languages:    Languages;
    latlng:       number[];
    demonyms:     Demonyms;
    translations: { [key: string]: Translation };
    gini?:        { [key: string]: number };
    flags:        Flags;
    coatOfArms:   CoatOfArms;
    startOfWeek:  StartOfWeek;
    capitalInfo:  CapitalInfo;
    postalCode:   PostalCode;
}

export interface CapitalInfo {
    latlng?: number[];
}

export interface Car {
    signs: string[];
    side:  Side;
}

export enum Side {
    Left = "left",
    Right = "right",
}

export interface CoatOfArms {
    png?: string;
    svg?: string;
}

export interface Currency {
    symbol: string;
    name:   string;
}

export interface Demonyms {
    eng: EngClass;
    fra: EngClass;
}

export interface EngClass {
    f: string;
    m: string;
}

export interface Flags {
    png: string;
    svg: string;
    alt: string;
}

export interface Idd {
    root:     string;
    suffixes: string[];
}

export interface Languages {
    fra?: string;
    sag?: string;
    eng?: EngEnum;
    nya?: string;
    kor?: string;
    nor?: string;
    mri?: string;
    nzs?: string;
    zho?: string;
    msa?: string;
    tam?: string;
    spa?: string;
    pih?: string;
    jam?: string;
    pau?: string;
    tha?: string;
}

export enum EngEnum {
    English = "English",
}

export interface Maps {
    googleMaps:     string;
    openStreetMaps: string;
}

export interface Name {
    common:     string;
    official:   string;
    nativeName: { [key: string]: Translation };
}

export interface Translation {
    official: string;
    common:   string;
}

export interface PostalCode {
    format: null | string;
    regex:  null | string;
}

export enum StartOfWeek {
    Monday = "monday",
    Sunday = "sunday",
}

export enum Status {
    OfficiallyAssigned = "officially-assigned",
}

export interface Weather {
    name: string;
    dt_txt: any;
    main: {
        temp: number;
        humidity: number;
    };
    weather: {
        main: string;
        description: string;
    }[];
}
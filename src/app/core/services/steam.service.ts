import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SteamStatus {
    personaname: string;
    profileurl: string;
    avatarfull: string;
    personastate: number;
    gameextrainfo?: string;
    gameid?: string;
    headerImage?: string;
    playing: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class SteamService {
    private apiUrl = '/api/steam';

    constructor(private http: HttpClient) { }

    getSteamStatus(): Observable<SteamStatus> {
        return this.http.get<SteamStatus>(`${this.apiUrl}/status`);
    }
}

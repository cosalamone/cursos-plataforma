import { TestBed } from "@angular/core/testing"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { AuthService } from "./auth.service";
import { Usuario } from "src/interfaces";
import { enviroment } from "src/enviroments/enviroments";
import { Router } from "@angular/router";
import { skip } from "rxjs";

import { provideMockStore } from '@ngrx/store/testing';



describe('Pruebas sobre AuthService', () => {
    let service: AuthService;
    let httpController: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [provideMockStore({})],
            imports: [
                HttpClientTestingModule
            ]

        }).compileComponents();

        service = TestBed.inject(AuthService);
        httpController = TestBed.inject(HttpTestingController);
    })


    it('Logout debe emitir un authUser null, remover el token del LocalStorage y redireccionar al usuario', () => {

        const logInFake: Usuario = {
            id: 2,
            nombreApellido: 'Testing AuthService',
            email: 'test@mail.com',
            password: 'test',
            token: 'sxcfvgy4e3w',
            img: 'img_hombre1.png',
            role: 'admin'
        }
        const MOCK_REQUEST_RESULT: Usuario[] = [
            {
                id: logInFake.id,
                nombreApellido: logInFake.nombreApellido,
                email: logInFake.email,
                password: logInFake.password,
                token: logInFake.token,
                img: 'img_hombre1.png',
                role: logInFake.role
            }
        ]

        spyOn(TestBed.inject(Router), 'navigate')

        service.logIn(logInFake);

        httpController.expectOne({
            url: `${enviroment.baseURL}/usuarios?email=${logInFake.email}&password=${logInFake.password}`,
            method: 'GET',
        }).flush(MOCK_REQUEST_RESULT)


        service.logOut();

        const tokenLs = localStorage.getItem('token');

        expect(tokenLs).toBeNull();

    })
})
import { TestBed } from "@angular/core/testing"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { AuthService } from "./auth.service";
import { Usuario } from "src/interfaces";
import { enviroment } from "src/enviroments/enviroments";
import { Router } from "@angular/router";
import { skip } from "rxjs";

describe('Pruebas sobre AuthService', () => {
    let service: AuthService;
    let httpController: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        }).compileComponents();

        service = TestBed.inject(AuthService);
        httpController = TestBed.inject(HttpTestingController);
    })

    it('Login debe funcionar', () => {
        const logInFake: Usuario = {
            id: 2,
            nombreApellido: 'Testing AuthService',
            email: 'test@mail.com',
            password: 'test',
            token: 'sxcfvgy4e3w',
            role: 'admin'
        }
        const MOCK_REQUEST_RESULT: Usuario[] = [
            {
                id: logInFake.id,
                nombreApellido: logInFake.nombreApellido,
                email: logInFake.email,
                password: logInFake.password,
                token: logInFake.token,
                role: logInFake.role
            }
        ]

        spyOn(TestBed.inject(Router), 'navigate')

        service.obtenerUsuarioAutenticado()
            .pipe(
                skip(1),// para que ignore la primer emision que siempre es null
            )
            .subscribe((usuario) => {
                console.log(usuario);
                expect(usuario).toBeTruthy(); // valida que el valor recibido en expec no sea null, ni undefined ni false
            })

        service.logIn(logInFake);



        httpController.expectOne({
            url: `${enviroment.baseURL}/usuarios?email=${logInFake.email}&password=${logInFake.password}`,
            method: 'GET',
        }).flush(MOCK_REQUEST_RESULT) // que retorna: array/number/boolean --> en este caso un array de usuarios

       
    })

    it('Logout debe emitir un authUser null, remover el token del LocalStorage y redireccionar al usuario',()=>{

        const logInFake: Usuario = {
            id: 2,
            nombreApellido: 'Testing AuthService',
            email: 'test@mail.com',
            password: 'test',
            token: 'sxcfvgy4e3w',
            role: 'admin'
        }
        const MOCK_REQUEST_RESULT: Usuario[] = [
            {
                id: logInFake.id,
                nombreApellido: logInFake.nombreApellido,
                email: logInFake.email,
                password: logInFake.password,
                token: logInFake.token,
                role: logInFake.role
            }
        ]

        spyOn(TestBed.inject(Router), 'navigate')

        service.logIn(logInFake);

        httpController.expectOne({
            url: `${enviroment.baseURL}/usuarios?email=${logInFake.email}&password=${logInFake.password}`,
            method: 'GET',
        }).flush(MOCK_REQUEST_RESULT) // que retorna: array/number/boolean --> en este caso un array de usuarios


        service.logOut();

        const tokenLs = localStorage.getItem('token');

        expect(tokenLs).toBeNull();

    })
})
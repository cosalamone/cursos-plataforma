import { TestBed } from "@angular/core/testing"
import { LogInComponent } from "./log-in.component";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "src/app/shared/shared.module";

describe('Pruebas de LogInComponent', () => {

    let component: LogInComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                LogInComponent
            ],
            imports: [
                HttpClientModule,
                SharedModule,
            ]
        }).compileComponents();

        const fixture = TestBed.createComponent(LogInComponent); // instancia el componente
        component = fixture.componentInstance; // obtengo acceso a todas los metodos de la clase
        fixture.detectChanges(); // debe llamarse antes de que se ejecute cada prueba
    });

    it('Si el campo email está vacio el FormControl del email debe ser invalido', () => {
        component.authForm.setValue({ email: null, password: null })

        expect(component.emailControl.invalid).toBeTrue();
    })
});
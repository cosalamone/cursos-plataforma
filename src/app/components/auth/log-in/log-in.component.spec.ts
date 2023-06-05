import { TestBed } from "@angular/core/testing"
import { LogInComponent } from "./log-in.component";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "src/app/shared/shared.module";
import { AuthService } from "src/app/services/auth.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthServiceMock } from "../mocks/auth-service.mock";


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
                BrowserAnimationsModule,
                RouterTestingModule
            ],
            providers:[ 
                {
                    provide: AuthService,
                    useClass: AuthServiceMock,
                }
            ]
        }).compileComponents();

        const fixture = TestBed.createComponent(LogInComponent); 
        component = fixture.componentInstance;
        fixture.detectChanges(); 
    });


    it('Si el campo email está vacio el FormControl del email debe ser invalido', () => {
        component.authForm.setValue({ email: null, password: null })

        expect(component.emailControl.invalid).toBeTrue();
    });


    it('Si el campo password está vacio el FormControl de password debe ser invalido', () => {
        component.authForm.setValue({ email: null, password: null })

        expect(component.passwordControl.invalid).toBeTrue();
    }); 


    it('Si el AuthForm es invalido, debe marcar todos los controles como touched', () => {
        component.authForm.setValue({ email: null, password: null })

        const spyOnMarkedAllAsTouched= spyOn(component.authForm, 'markAllAsTouched');
        component.onSubmit();
        
        expect(spyOnMarkedAllAsTouched).toHaveBeenCalled();

    })

    
    it('Si el AuthForm es valido, debe llamar al método login del AuthService', ()=>{
        component.authForm.setValue({ email: 'test@mail.com', password: 'test' })
        const spyOnAuthServiceLogin = spyOn(TestBed.inject(AuthService), 'logIn');
        component.onSubmit();

        expect(component.authForm.valid).toBeTrue();
        expect(spyOnAuthServiceLogin).toHaveBeenCalled();
    })

});
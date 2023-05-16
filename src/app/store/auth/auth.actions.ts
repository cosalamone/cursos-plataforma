import { createAction, props } from "@ngrx/store";
import { Usuario } from "src/interfaces";

export const EstablecerUsuarioAutenticado = createAction(
    '[auth] Establecer usuario autenticado',
    props<{usuarios: Usuario & {token: string}}>(),
)

export const QuitarUsuarioAutenticado = createAction(
    '[auth] Quitar usuario autenticado'
)
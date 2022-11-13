import { IServer } from "../IServer";
import { Antispam } from "../Antispam";
export declare class RegisterState {
    static antispam: Antispam;
}
export declare function Register(server: IServer, endpoint: string): void;

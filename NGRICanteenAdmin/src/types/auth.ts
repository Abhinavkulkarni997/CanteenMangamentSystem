export interface User{
    id:string;
    name:string;
    mobile:string;
    email: string;
    employeeId:string;
    projectStaffId?: string | null;
    designation:string;
    division:string;
    role:string;
    userType:string;


    isActive?: boolean;
    photoUrl?: string;
    forcePasswordChange?: boolean;
}

// export interface AuthContextType{
//     user:User | null;
//     token:string | null;
//     loading:boolean;
//     login:(mobile:string,password:string)=>Promise<void>;
//     logout:()=>void;
// }
export interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;

    login: (
        email: string,
        password: string
    ) => Promise<LoginResponse>;

    logout: () => void;
}
export interface LoginResponse {
    token: string;
    forcePasswordChange: boolean;
    user: User;
}
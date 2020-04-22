export class User {
    constructor(
        public _id: string,
        public name: string,
        public surname: string,
        public nick: string,
        public email: String,
        public password: String,
        public role: String,
        public image: String
    ){}
}
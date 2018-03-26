index.js
//MIDDLEWARE
app.use(bodyParser.json());
app.use( session({        //SESSION DETAILS ADDED TO REQ.SESSION
   secret: SESSION_SECRET
   , resave: false
    , saveUninitialized: false
    , cookie: {maxAge: 1000000}
}))

app.use(passport.initialize());
app.use(passport.session());


//PASSPORT LOCAL STRATEGY
passport.use(new LocalStrategy(
    function(username, password, done) {
        app.get('db').retrieve_user([username]).then(result =>{
            const user = result[0];

            //VERIFY USERNAME EXISTS
            if(!user) {return done(null, 'Unauthorized')}
            
            //VERIFY PASSWORD MATCHES
            const validPassword = bcrypt.compareSync(password, user.password);
            if(!validPassword) {return done(null, 'Unauthorized')}

            //USER IS VERIFIED AND THEIR ID IS RETURNED
            return done(null, user.id)

        })
    }
))

passport.serializeUser((id, done) => {
    return done(null, id)
});

passport.deserializeUser((id, done) => {
    if(id === "Unauthorized") {
        return done(null, 'Unauthorized');
    }

    app.get('db').retrieve_user_by_id([id]).then(result => {
        const user = result[0];
        return done(null, user);
    })
});

controller

createUser: (req, res) => {
        const {first_name, last_name, email, phone, position, agencies_id, username, password} = req.body;
        const db = req.app.get('db');

        //ENCRYPT PASSWORD
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt); //HASH IS THE HASHED PASSWORD

        //CREATE NEW AGENCY EMPLOYEE
        db.create_agency_employee([first_name, last_name, email, phone, position, agencies_id]).then(result => {

            // GET NEW AGENCY EMPLOYEE ID
            const { id: agency_employees_id } = result[0];

            //CREATE NEW USER
            db.create_new_user([username, hash, agency_employees_id]).then(res.sendStatus(200))

        })
    },
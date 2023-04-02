// Packages
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// Mongoose Models
const Client = require("../models/Client");
const Project = require("../models/Project");
const UserLogin = require("../models/UserLogin");


const TOKEN= process.env.TOKEN;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  assertType,
} = require("graphql");

const ClientsType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientsType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

const UserLoginType = new GraphQLObjectType({
  name: "UserLogin",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

const TokenType = new GraphQLObjectType({
  name: "Token",
  fields:()=>({
    token: { type:new GraphQLNonNull(GraphQLString)}
  })
})

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addClient: {
      type: ClientsType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const newClinet = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return newClinet.save();
      },
    },
    deleteClient: {
      type: ClientsType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Client.findByIdAndRemove(args.id);
      },
    },
    addProject: {
      type: ProjectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        clientId: { type: new GraphQLNonNull(GraphQLID) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progess: { value: "Progess" },
              done: { value: "Done" },
            },
            defaultValue: "Not Started",
          }),
        },
      },
      resolve(parent, args) {
        const ProjectInfo = new Project({
          name: args.name,
          description: args.description,
          clientId: args.clientId,
          status: args.status,
        });

        return ProjectInfo.save();
      },
    },
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Project.findByIdAndDelete(args.id);
      },
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        clientId: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Not Started" },
              progess: { value: "Progess" },
              done: { value: "Done" },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
              clientId: args.clientId,
            },
          },
          { new: true }
        );
      },
    },
    signUpUser: {
      type: UserLoginType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        try {
          const hasEmail = await UserLogin.findOne({ email: args.email });
          if (hasEmail) {
            throw new Error(
              JSON.stringify({
                status: 409,
                errors: [{ 0: "Email Already Exist" }],
              })
            );
          }

          const hashedPassword = await bcrypt.hash(args.password, 10);

          console.log(hashedPassword);

          const newUser = new UserLogin({
            ...args,
            password: hashedPassword,
          });

          return newUser.save();
        } catch (error) {
          return error;
        }
      },
    },
    loginUser: {
      type: TokenType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString)},
      },
      resolve: async (parent, args) => {
        try {
          const user = await UserLogin.findOne({ email: args.email });
          if (!user) {
            throw new Error(
              JSON.stringify({
                status: 404,
                errors: [{ 0: "EmailId not Found" }],
              })
            );
          }

          const isPassword = await bcrypt.compare(args.password , user.password);
          if(isPassword){
            const jwtToken = jwt.sign({userId:user._id}, TOKEN)

            return {token: jwtToken}
          }
          else{
              throw new Error(
                  JSON.stringify({
                    status: 404,
                    errors: [{ 0: "Password is Incorrect" }],
                  })
                ); 
          }
        } catch (error) {
          return error;
        }
      },
  },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "RootQuery",
  fields: () => ({
    clients: {
      type: new GraphQLList(ClientsType),
      resolve(parent, args) {
        return Client.find();
      },
    },
    client: {
      type: ClientsType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    
  }),
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: Mutation,
});

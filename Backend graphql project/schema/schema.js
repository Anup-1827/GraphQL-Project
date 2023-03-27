const {projects, clients: clientList, clients} = require("../SampleData.js");

// Mongoose Models
const Client = require('../models/Client')
const Project = require('../models/Project')

const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType} = require('graphql');

const ClientsType = new GraphQLObjectType({
    name:"Client",
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString},      
    })
})

const ProjectType = new GraphQLObjectType({
    name:"Project",
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client:{
            type: ClientsType,
            resolve(parent, args){
                return Client.findById(parent.clientId)
            }
        }
    })
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields:()=>({
        addClient:{
            type: ClientsType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                phone: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args){
                const newClinet = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                })

                return newClinet.save();
            }
        },
        deleteClient:{
            type: ClientsType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
             return   Client.findByIdAndRemove(args.id)
            }
        },
        addProject:{
            type: ProjectType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: new GraphQLNonNull(GraphQLString)},
                clientId: {type: new GraphQLNonNull(GraphQLID)},
                status: {
                    type: new GraphQLEnumType({
                        name:"ProjectStatus",
                        values:{
                            new:{value:"Not Started"},
                            progess:{value:"Progess"},
                            done:{value:"Done"}
                        },
                        defaultValue: "Not Started"
                    }),
                },
            },
            resolve(parent,args){
                const ProjectInfo = new Project({
                    name: args.name,
                    description: args.description,
                    clientId: args.clientId,
                    status:args.status
                })

                return ProjectInfo.save();
            }
        },
        deleteProject:{
            type: ProjectType,
            args:{
                id:{ type: new GraphQLNonNull(GraphQLString)} 
            },
            resolve(parent,args){
                return Project.findByIdAndDelete(args.id)
            }
        },
        updateProject:{
            type:ProjectType,
            args:{
                id: {type:  new GraphQLNonNull(GraphQLID)},
                name:{type: GraphQLString} ,
                description: {type: GraphQLString},
                clientId: {type: GraphQLString},
                status:{
                    type: new GraphQLEnumType({
                        name: "ProjectStatusUpdate",
                        values:{
                            new:{value:"Not Started"},
                            progess:{value:"Progess"},
                            done:{value:"Done"}
                        },
                    })
                },
            },
            resolve(parent,args){
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set:{
                            name: args.name,
                            description: args.description,
                            status: args.status,
                            clientId: args.clientId
                        }
                    },
                    {new: true}
                )
            }
        }

    })
})

const RootQueryType = new GraphQLObjectType({
    name: "RootQuery",
    fields:()=>({
        clients:{
            type : new GraphQLList(ClientsType),
            resolve(parent, args){
                return Client.find();
            }
        },
        client:{
            type: ClientsType,
            args: {id:{type:GraphQLID}},
            resolve(parent, args){
                return Client.findById(args.id)
            }
        },
        projects:{
            type : new GraphQLList(ProjectType),
            resolve(parent, args){
                return Project.find()
            }
        },
        project:{
            type: ProjectType,
            args: {id:{type:GraphQLID}},
            resolve(parent, args){
                return Project.findById(args.id);
            }
        },
    })
})


module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation: Mutation
})
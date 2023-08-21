const { graphql, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql')
const { projects, clients } = require('../sampleData')

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLEnumType } = require("graphql")

const Client = require('../models/Client')
const Project = require('../models/Project')

// Jo data mangwana ha vo kis trah ka ho = ClientType, ProjectType
// Client Type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    })
})

// Project Type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return Client.findById(parent.clientId)
            }

        }
    })
})


// RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find()
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return projects.find(project => project.id === args.id )
                return Project.findById(args.id)
            }
        },
        clients: {
            type: GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find()
            }
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return clients.find(client => client.id === args.id )
                return Client.findById(args.id)
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        addClient: {
            type: ClientType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });

                return client.save();
            }
        },

        deleteClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                Project.find({clientId: args.id}).then((projects)=>{
                    projects.forEach((project)=>{
                        project.deleteOne()
                    })
                })

                return Client.findByIdAndRemove(args.id)
            }
        },

        addProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                status: {
                    type: new GraphQLEnumType({
                        name:"ProjectStatus",
                        values: {
                            new: { value: "Not Started" },
                            progress: { value: "In Progress" },
                            completed: { value: "completed" }
                        },
                        defaultValue: "Not Started",
                    }),
                },                
                clientId: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId
                })
                return project.save()
            }
        },

        deleteProject:{
            type:ProjectType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID)}
            },
            resolve(parent , args){
                return Project.findByIdAndRemove(args.id)
            }
        },

        updateProject:{
            type:ProjectType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID)},
                name:{type:GraphQLString},                
                description: { type: GraphQLNonNull(GraphQLString) },
                status: {
                    type: new GraphQLEnumType({
                        name:"ProjectStatusUpdate",
                        values: {
                            new: { value: "Not Started" },
                            progress: { value: "In Progress" },
                            completed: { value: "completed" }
                        },
                        defaultValue: "Not Started",
                    }),
                },   

            },
            resolve(parent, args){
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set:{
                            name:args.name,
                            description:args.description,
                            status: args.status
                        }
                    },
                    {new:true}
                )
            }
            
        }


    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
})
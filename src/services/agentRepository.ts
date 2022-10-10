import { Agent } from "~/models";
import { v4 as uuidv4 } from "uuid";

let agents: Array<Agent>;

function getAgentsFromCache() {
    if (!agents) {
        generateInitialData();
    }
    return agents;
}

function generateInitialData() {
    agents = [
        { agentID: '1', codeName: '007', firstName: 'James', lastName: 'Bond', imagePath: '/images/JamesBondImage.png', description: 'Killer'},
        { agentID: '2', codeName: 'Q', firstName: 'Desmond', lastName: 'Llewelyn', imagePath: '/images/LDesmond.png', description: 'Master of Gadgets'},
        { agentID: '3', codeName: 'Ive', firstName: 'Vesper', lastName: 'Lynd', imagePath: '/images/VesperLynd.png', description: 'Double agent'},
        { agentID: '4', codeName: 'King', firstName: 'Chuck', lastName: 'Noris', imagePath: '/images/ChuckNoris.png', description: 'Facts Collector'}
    ];
}

class AgentsRepository {
    private agents: Array<Agent> = [];

    constructor() {
        this.agents = getAgentsFromCache();
    }

    getAll = () => {
        return this.agents;
    }

    updateAll = (agents: Array<Agent>) => {
        this.agents = agents;
    }

    get = (id: string) => {
        return this.agents.find((agent) => agent.agentID == id) || {} as Agent;
    }

    create = (agent: Agent) => {
        agent.agentID = uuidv4();

        this.agents = [
          ...this.agents,
          agent
        ];
    }

    update = (agent: Agent) => {
        const index = this.agents.findIndex((agt) => {
            return agt.agentID == agent.agentID;
        });

        this.agents = [
          ...this.agents.slice(0, index),
          agent,
          ...this.agents.slice(index + 1)
        ];
    }

    delete = (agentID: string) => {
        const index = this.agents.findIndex((agent) => {
            return agent.agentID === agentID;
        });

        this.agents = [
            ...this.agents.slice(0, index),
            ...this.agents.slice(index + 1)
        ];
    }
}

const agentRepository = new AgentsRepository();
export { agentRepository };
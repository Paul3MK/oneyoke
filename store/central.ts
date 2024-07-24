import { Id } from "@/convex/_generated/dataModel"
import { create } from "zustand"

type RoleState = {
    roles: {
        roleName: Id<"roles">,
        members: Id<"users">[]
    }[],
    addRole: (newRole: {
        roleName: string,
        members: string[]
    }) => void,
    removeRole: (name: string, position: string) => void 
}

type SectionState = {
    sections: {
        sectionName: string,
        sectionContent: any[]
    }[],
    addSection: (newSection: {
        sectionName: string,
        sectionContent: any[]
    }) => void,
    removeSection: (name: string) => void
}

export const useRoleStore = create<RoleState>()((set)=>({
    roles: [],
    addRole: (newRole)=>set(state=>({roles: [...state.roles, newRole]})),
    removeRole: (name, position) => set(state=>({roles: state.roles.filter(role=>role.roleName!=position && role.members[0]!=name)}))
}))

export const useSectionStore = create<SectionState>()(set=>({
    sections: [],
    addSection: (newSection)=>set(state=>({sections: [...state.sections, newSection]})),
    removeSection: (sectionName)=>set(state=>({sections: state.sections.filter(section=>section.sectionName!=sectionName)}))
}))
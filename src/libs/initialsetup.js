import Role from '../models/role.model.js'


export const createRole = async () => { 

    try {
        const count = await Role.estimatedDocumentCount();
    
        if (count > 0 ) return;
    
        const values = await Promise.all([
        new Role ({name: 'Organizador'}).save(),
        new Role ({name: 'Fotografo'}).save(),
        new Role ({name: 'Invitado'}).save()
        ]
        );

    
    } catch (error) {
        console.error(error)  
    }

}
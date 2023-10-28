import {
  belongsTo,
  createServer,
  hasMany,
  Model,
  RestSerializer,
} from 'miragejs'

export default function () {
  createServer({
    models: {
      project: Model.extend({
        sections: hasMany(),
      }),
      section: Model.extend({
        project: belongsTo(),
        tasks: hasMany(),
      }),
      task: Model.extend({
        section: belongsTo(),
      }),
    },

    serializers: {
      project: RestSerializer.extend({
        include: ['sections'],
      }),
    },

    seeds(server) {
      const matchUpsProject = server.create('project', {
        id: '1',
        name: 'Matchups',
        slug: 'matchups',
      })
      server.create('project', {
        id: '2',
        name: 'MirageJS',
        slug: 'miragejs',
      })
      server.create('project', { id: '3', name: 'Orikumo', slug: 'orikumo' })
      server.create('project', {
        id: '4',
        name: 'Issue Tracker',
        slug: 'issue-tracker',
      })

      const matchupsTodoSection = server.create('section', {
        id: '1',
        name: 'to do',
        project: matchUpsProject,
      })
      const matchupsInProgressSection = server.create('section', {
        id: '2',
        name: 'in progress',
        project: matchUpsProject,
      })
      server.create('section', {
        id: '3',
        name: 'code review',
        project: matchUpsProject,
      })
      server.create('section', {
        id: '4',
        name: 'validation',
        project: matchUpsProject,
      })
      server.create('section', {
        id: '5',
        name: 'ready',
        project: matchUpsProject,
      })

      server.create('task', {
        id: '1',
        title: 'Crear diseño en Figma',
        type: 'Tarea',
        assignee: 'Sergio Diosdado',
        section: matchupsTodoSection,
      })
      server.create('task', {
        id: '2',
        title: 'Adaptar navegación cuando es una pantalla de celular',
        type: 'Tarea',
        assignee: 'Cristian Hernández',
        section: matchupsTodoSection,
      })
      server.create('task', {
        id: '3',
        title: 'No funciona el drag n’ drop',
        type: 'Bug',
        assignee: 'Eduardo Diosdado',
        section: matchupsInProgressSection,
      })
    },

    routes() {
      this.namespace = 'api'

      this.get('/projects', (schema) => {
        return schema.projects.all()
      })

      this.get('projects/:id', (schema, request) => {
        const id = request.params.id
        return schema.projects.find(id)
      })

      this.get('sections/:id', (schema, request) => {
        const id = request.params.id
        return schema.sections.find(id).tasks
      })
    },
  })
}

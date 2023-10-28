import { Card } from './card'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { z } from 'zod'

const taskSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  type: z.string().min(1),
  assignee: z.string().min(1),
})
const fetchSectionTasks = async (sectionId: string) => {
  const responseSchema = z.object({
    tasks: z.array(taskSchema),
  })
  const data = await fetch(`api/sections/${sectionId}`).then((res) =>
    res.json(),
  )
  return responseSchema.parse(data)
}
function Section({ id, title }: { id: string; title: string }) {
  const { data } = useQuery({
    queryKey: ['sectionTasks', id],
    queryFn: () => fetchSectionTasks(id),
  })

  return (
    <section className="flex min-h-[30rem] w-80 flex-shrink-0 flex-col gap-4 rounded-md border border-gray-300 px-3 py-5">
      <header className="border-b border-gray-200 font-semibold uppercase">
        {title}
      </header>
      {data?.tasks?.map((task) => (
        <Card
          key={task.id}
          title={task.title}
          badgeLabel={task.type}
          assignee={task.assignee}
        />
      ))}
    </section>
  )
}

const projectSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1).toLowerCase(),
})
const sectionSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
})
const fetchProject = async (projectId: string) => {
  const responseSchema = z.object({
    project: projectSchema,
    sections: z.array(sectionSchema),
  })
  const data = await fetch(`api/projects/${projectId}`).then((res) =>
    res.json(),
  )
  return responseSchema.parse(data)
}
export function Project() {
  const { projectId } = useParams()

  const { data } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => fetchProject(projectId!),
    enabled: !!projectId,
  })

  return (
    <div className="flex h-full flex-col">
      <div className="no-scrollbar my-auto mt-auto flex gap-8 overflow-auto pr-8">
        {data?.sections?.map((section) => (
          <Section key={section.id} id={section.id} title={section.name} />
        ))}
      </div>
    </div>
  )
}

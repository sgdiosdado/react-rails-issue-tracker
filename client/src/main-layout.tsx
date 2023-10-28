import { PlusIcon } from '@radix-ui/react-icons'
import { useQuery } from '@tanstack/react-query'
import { cva } from 'class-variance-authority'
import { Link, Outlet, useParams } from 'react-router-dom'
import { z } from 'zod'

const projectSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1).toLowerCase(),
})
const responseSchema = z.object({
  projects: z.array(projectSchema),
})

const fetchProjects = async () => {
  const data = await fetch('/api/projects').then((res) => res.json())
  return responseSchema.parse(data)
}

export function MainLayout() {
  const { projectId } = useParams()
  
  const { data } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  })

  return (
    <div className="grid min-h-screen grid-flow-col grid-cols-6">
      <aside className="col-span-1 border border-r border-gray-200 p-8 text-neutral-800">
        <h1 className="mb-11 font-bold">Proyectos</h1>
        <nav>
          <ul className="flex flex-col gap-2">
            {data?.projects.map((project) => (
              <MenuItem
                key={project.id}
                label={project.name}
                to={String(project.id)}
                isSelected={project.id === projectId}
              />
            ))}
          </ul>
          <a className="flex items-center gap-2 rounded-md px-6 py-2 text-gray-400 hover:bg-slate-100">
            <PlusIcon />
            Crear proyecto
          </a>
        </nav>
      </aside>
      <main className="col-span-5 bg-slate-100 py-12 pl-24 text-gray-600">
        <header>
          <p>
            {`Proyectos / ${data?.projects.find(
              (project) => project.id === projectId,
            )?.name}`}
          </p>
        </header>
        <Outlet />
      </main>
    </div>
  )
}

const menuItem = cva(['rounded-md'], {
  variants: {
    state: {
      unselected: ['hover:bg-slate-100'],
      selected: ['bg-sky-500', 'font-semibold', 'text-white'],
    },
  },
  defaultVariants: {
    state: 'unselected',
  },
})

function MenuItem({
  label,
  to,
  isSelected = false,
}: {
  label: string
  to: string
  isSelected?: boolean
}) {
  return (
    <li className={menuItem({ state: isSelected ? 'selected' : 'unselected' })}>
      <Link to={to} className="inline-block w-full px-6 py-2">
        {label}
      </Link>
    </li>
  )
}
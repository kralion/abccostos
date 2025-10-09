import {
  HouseIcon,
  SettingsIcon,
  UsersIcon
} from "lucide-react"

  import {
  Tabs,
  TabsList,
  TabsTrigger
} from "@workspace/ui/components/tabs"

interface PrimaryTabsProps {
  activeTab: string
  onTabChange: (value: string) => void
}

  export default function PrimaryTabs({ activeTab, onTabChange }: PrimaryTabsProps) {
    return (
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <TabsList className="text-foreground mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1">
            <TabsTrigger
              value="general"
              className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <HouseIcon
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              <span className="hidden md:block">

              Datos Generales
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="configurations"
              className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <SettingsIcon
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              <span className="hidden md:block">

              Configuraciones
              </span>
             
            </TabsTrigger>
            <TabsTrigger
              value="roles"
              className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <UsersIcon
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              <span className="hidden md:block">

              Roles
              </span>
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    )
  }
  

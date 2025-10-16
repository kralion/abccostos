# Authentication & Authorization Flow

```mermaid
graph TB
    subgraph "1. App Initialization"
        A[main.tsx] -->|initialize| B[auth-store]
        B -->|getSession| C[Supabase Auth]
        C -->|session + user| B
        B -->|fetchProfile user.id| D[Supabase DB profiles table]
        D -->|Profile id, name, last_name, image_url, role| B
        B -->|Store: user, session, profile| E[Auth State]
        B -->|Listen: onAuthStateChange| C
    end

    subgraph "2. Route Protection"
        F[User navigates] --> G{_authenticated route}
        G -->|beforeLoad| H[Check isLoading]
        H -->|Wait max 5s| I{user exists?}
        I -->|No| J[redirect /sign-in]
        I -->|Yes| K[Load route]
    end

    subgraph "3. Role-Based Route Guards"
        K --> L{Route has role guard?}
        L -->|Yes| M[route-guards.ts]
        M --> N{Check requireRole}
        N -->|requireRole allowedRoles| O[profile.role in allowedRoles?]
        O -->|No| P[getRoleDashboard role]
        P -->|owner| Q[redirect /dashboard-propietario]
        P -->|admin| R[redirect /dashboard-admin]
        P -->|user| S[redirect /]
        O -->|Yes| T[Allow access]
        L -->|No| T
        
        N -->|requireMinRole| U[Check role hierarchy]
        U -->|owner: 3, admin: 2, user: 1| V{userRole >= minRole?}
        V -->|No| P
        V -->|Yes| T
    end

    subgraph "4. Sidebar Rendering"
        T --> W[AppSidebar component]
        W -->|useAuthStore| E
        E -->|profile, user| W
        W -->|profile?.role or 'user'| X[userRole]
        X --> Y{getRoleGroupTitle}
        Y -->|owner| Z1[Propietario]
        Y -->|admin| Z2[Administrador]
        Y -->|user| Z3[Proyecto]
        
        W -->|getSidebarData profile, email| AA[sidebar-data.ts]
        AA --> AB[Returns navGroups]
        AB --> AC[Propietario: Dashboard, Clientes]
        AB --> AD[Administrador: Dashboard, Usuarios, Proyectos]
        AB --> AE[Proyecto: Dashboard, Datos, Presupuesto, Parámetros, Catálogos]
        
        W -->|filter navGroups| AF{group.title === groupTitle?}
        AF -->|Yes| AG[Render NavGroup]
        AF -->|No| AH[Hide NavGroup]
    end

    subgraph "5. Bottom Tabs Rendering"
        T --> AI[AppBottomTabs component]
        AI -->|useAuthStore| E
        E -->|profile, user| AI
        AI -->|profile?.role or 'user'| AJ[userRole]
        AJ --> AK{getRoleGroupTitle}
        AK -->|owner| AL1[Propietario]
        AK -->|admin| AL2[Administrador]
        AK -->|user| AL3[Proyecto]
        
        AI -->|getSidebarData profile, email| AM[sidebar-data.ts]
        AM --> AN[Returns navGroups]
        AN --> AO[Same 3 groups as sidebar]
        
        AI -->|find navGroup| AP{group.title === groupTitle?}
        AP -->|Yes| AQ[Get group items]
        AQ --> AR[Filter NavLink items]
        AR --> AS[Render bottom tabs with icons]
        AP -->|No| AT[No tabs shown]
    end

    subgraph "6. Route Examples"
        AU[/dashboard-admin] -->|beforeLoad| AV[requireRole 'admin']
        AW[/dashboard-propietario] -->|beforeLoad| AX[requireRole 'owner']
        AY[/usuarios] -->|beforeLoad| AZ[requireRole 'admin']
        BA[/ default dashboard] -->|beforeLoad| BB[No guard - all authenticated]
    end

    style A fill:#e1f5ff
    style B fill:#e1f5ff
    style E fill:#fff4e1
    style M fill:#ffe1e1
    style W fill:#e1ffe1
    style AI fill:#e1ffe1
    style AA fill:#f0e1ff
    style AM fill:#f0e1ff
```

## Key Components

### 1. **auth-store.ts** (Zustand Store)
- **initialize()**: Gets session from Supabase, fetches profile from DB
- **fetchProfile(userId)**: Queries `profiles` table for user data including role
- **onAuthStateChange**: Listens for auth changes and updates state
- **State**: `user`, `session`, `profile`, `isLoading`

### 2. **route-guards.ts** 
Two main guards:

#### **requireRole(allowedRoles: UserRole[])**
```typescript
// Exact role match - user must have one of the specified roles
requireRole(['admin']) // Only admin can access
requireRole(['owner']) // Only owner can access
```

#### **requireMinRole(minRole: UserRole)**
```typescript
// Hierarchy check: owner(3) > admin(2) > user(1)
requireMinRole('admin') // admin and owner can access
```

Both redirect to role-specific dashboard on failure:
- `owner` → `/dashboard-propietario`
- `admin` → `/dashboard-admin`
- `user` → `/`

### 3. **sidebar-data.ts**
Returns 3 nav groups based on role:
- **Propietario**: Dashboard, Clientes
- **Administrador**: Dashboard, Usuarios, Proyectos
- **Proyecto**: Dashboard, Datos Principales, Presupuesto, Parámetros, Catálogos

### 4. **AppSidebar** & **AppBottomTabs**
Both components:
1. Get `profile` from `useAuthStore()`
2. Extract `profile?.role || 'user'`
3. Map role to group title via `getRoleGroupTitle()`
4. Call `getSidebarData(profile, email)`
5. Filter nav groups to show only matching role's items

### 5. **Route Protection Flow**
```
User navigates → _authenticated beforeLoad → Check auth → 
Route specific beforeLoad → requireRole/requireMinRole → 
Match? → Render | No match? → Redirect to role dashboard
```

## Role Hierarchy

| Role  | Level | Access |
|-------|-------|--------|
| owner | 3     | All owner routes |
| admin | 2     | All admin routes |
| user  | 1     | Default dashboard routes |

Each role sees ONLY their designated navigation items in both sidebar and bottom tabs.

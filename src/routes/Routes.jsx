import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { AdminLayout } from '../layout/AdminLayout'
import { UserLayout } from '../layout/UserLayout'
import { UserRole } from '../lib/constants/common'
import { AdminMeals } from '../pages/admin/AdminMeals'
import { AdminOrders } from '../pages/admin/AdminOrders'
import { MealsPage } from '../pages/user/Meals'
import { SingIn } from '../pages/user/SingIn'
import { SingUp } from '../pages/user/SingUp'
import { ProtectedRoutes } from './ProtectedRoutes'

export const AppRoutes = () => {
    const role = useSelector((state) => state.auth.user.role)

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoutes
                        isAllowed={[UserRole.GUEST, UserRole.USER].includes(
                            role
                        )}
                        fallBackPath={'/admin/meals'}
                        component={<UserLayout />}
                    />
                }
            >
                <Route
                    index
                    element={
                        <ProtectedRoutes
                            isAllowed={[UserRole.GUEST, UserRole.USER].includes(
                                role
                            )}
                            fallBackPath={'/admin/meals'}
                            component={<MealsPage />}
                        />
                    }
                />
                <Route
                    path="signup"
                    element={
                        <ProtectedRoutes
                            isAllowed={[UserRole.GUEST].includes(role)}
                            fallBackPath={
                                role === UserRole.ADMIN ? '/admin/meals' : '/'
                            }
                            component={<SingUp />}
                        />
                    }
                />
                <Route
                    path="signin"
                    element={
                        <ProtectedRoutes
                            isAllowed={[UserRole.GUEST].includes(role)}
                            fallBackPath={
                                role === UserRole.ADMIN ? '/admin/meals' : '/'
                            }
                            component={<SingIn />}
                        />
                    }
                />
            </Route>
            <Route
                path="/admin"
                element={
                    <ProtectedRoutes
                        isAllowed={[UserRole.ADMIN].includes(role)}
                        fallBackPath={'/'}
                        component={<AdminLayout />}
                    />
                }
            >
                <Route
                    path="meals"
                    element={
                        <ProtectedRoutes
                            isAllowed={[UserRole.ADMIN].includes(role)}
                            fallBackPath={'/'}
                            component={<AdminMeals />}
                        />
                    }
                />
                <Route
                    path="orders"
                    element={
                        <ProtectedRoutes
                            isAllowed={[UserRole.ADMIN].includes(role)}
                            fallBackPath={'/'}
                            component={<AdminOrders />}
                        />
                    }
                />
            </Route>
        </Routes>
    )
}

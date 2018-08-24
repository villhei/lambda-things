// Unary function type for constructing functions
export type Fun = (a: Fun) => Fun

export const Identity = (a: Fun) => a

// Boolean constants
export const True = (truthy: Fun) => (falsy: Fun): Fun => truthy
export const False = (truthy: Fun) => (falsy: Fun): Fun => falsy

// ∧ ≡ λxy.xy(λuv.v) ≡ λxy.xyF
export const AND = (x: Fun) => (y: Fun) => x(y)(False)

// ∨ ≡ λxy.x(λuv.u)y ≡ λxy.xTy
export const OR = (x: Fun) => (y: Fun) => x(True)(y)

// ¬ ≡ λx.x(λuv.v)(λab.a) ≡ λx.xFT
export const NOT = (x: Fun) => x(False)(True)

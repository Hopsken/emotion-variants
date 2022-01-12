import { css } from '@emotion/react'
import styled, { CSSObject } from '@emotion/styled'
import type * as TypeUtils from './type-utils'

type VariantNames<T extends Record<string, unknown>> =
  'variants' extends keyof T ? keyof T['variants'] : never
type VariantProps<T extends Record<string, unknown>> =
  'variants' extends keyof T
    ? {
        [Name in keyof T['variants']]?: TypeUtils.Widen<
          keyof T['variants'][Name]
        >
      }
    : {}

export const styledWithVariants = <
  ComponentType extends keyof JSX.IntrinsicElements,
  Composer extends TypeUtils.RemoveIndex<CSSObject> & {
    variants?: {
      [Name in string]: {
        [Pair in string | number]: CSSObject
      }
    }
    compoundVariants?: (('variants' extends keyof Composer
      ? {
          [Name in keyof Composer['variants']]?: TypeUtils.Widen<
            keyof Composer['variants'][Name]
          >
        }
      : TypeUtils.WideObject) & {
      css: CSSObject
    })[]
    defaultVariants?: 'variants' extends keyof Composer
      ? {
          [Name in keyof Composer['variants']]?: TypeUtils.Widen<
            keyof Composer['variants'][Name]
          >
        }
      : TypeUtils.WideObject
  }
>(
  component: ComponentType,
  composer: Composer
) => {
  return styled(component)<VariantProps<Composer>>(props => {
    const { theme, ...restProps } = props
    const { variants, compoundVariants, defaultVariants, ...commonCss } =
      composer

    if (!variants) {
      return commonCss
    }

    const variantCssList: CSSObject[] = []

    for (const variantName in variants) {
      const variantPair = variants[variantName]
      const propValue =
        (restProps as any)[variantName as VariantNames<Composer>] ??
        defaultVariants?.[variantName as VariantNames<Composer>]
      const variantCss = variantPair[propValue]
      variantCss && variantCssList.push(variantCss)
    }

    const compoundVariantCssList: CSSObject[] = []

    for (const compoundVariant of compoundVariants ?? []) {
      const { css, ...vMatch } = compoundVariant
      if (isMatchObject(vMatch, restProps)) {
        compoundVariantCssList.push(css)
      }
    }

    return [commonCss, ...variantCssList, ...(compoundVariantCssList ?? [])]
  })
}

function isMatchObject(
  target: Record<string, any>,
  source: Record<string, any>
) {
  for (const key in target) {
    if (target[key] !== source[key]) {
      return false
    }
  }
  return true
}

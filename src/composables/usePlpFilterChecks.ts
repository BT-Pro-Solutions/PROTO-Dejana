import { computed, ref, type Ref } from 'vue'

type FilterOption = string | { label: string; checked?: boolean }

/** Checkbox matrix + active count for PLP filter sidebars (string or labeled options). */
export function usePlpFilterChecks(groups: { title: string; options: FilterOption[] }[]) {
  const checked: Ref<boolean[][]> = ref(
    groups.map((g) => g.options.map((o) => (typeof o === 'string' ? false : !!o.checked))),
  )

  const activeFilterCount = computed(() => checked.value.flat().filter(Boolean).length)

  function isOn(gi: number, oi: number) {
    return !!checked.value[gi]?.[oi]
  }

  function onCheck(gi: number, oi: number, ev: Event) {
    const row = checked.value[gi]
    if (!row) return
    row[oi] = (ev.target as HTMLInputElement).checked
  }

  return { activeFilterCount, isOn, onCheck }
}

import { AdvancedSearch } from "@/components/search/advanced-search"

export default function SearchPage() {
  return (
    <div className="pt-14 sm:pt-16">
      <div className="container-responsive py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Advanced Search</h1>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
            Find exactly what you're looking for with our intelligent search system
          </p>
        </div>
        <AdvancedSearch />
      </div>
    </div>
  )
}

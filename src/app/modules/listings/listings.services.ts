import AppError from '../../error/AppError'
import { flattenObject } from '../../utils/flattenObject'
import QueryBuilder from '../../utils/queryBuilder'
import { listingSearchFields } from './listings.const'
import { IListing } from './listings.interface'
import Listing from './listings.model'

const ListingService = {
  createIntoDB: async (listing: IListing) => {
    const { _id } = await Listing.create(listing)

    return await Listing.findById(_id)
      .select('title description category price status userID')
      .populate({ path: 'userID', select: 'name email phone' })
  },

  getAllFromDB: async (query: Record<string, unknown>) => {
    const listingQuery = new QueryBuilder(
      Listing.find().select(
        'title description category price condition status userID brand'
      ),
      query
    )

    const [data, meta] = await Promise.all([
      listingQuery
        .search(listingSearchFields)
        .filter()
        .sort()
        .select()
        .paginate()
        .build()
        .populate({ path: 'userID', select: 'name email phone' }),
      listingQuery.countTotal(),
    ])

    return { data, meta }
  },

  getByIdFromDB: async (id: string) => {
    const listing = await Listing.findById(id)
      .select('-__v')
      .populate({ path: 'userID', select: 'name email phone' })

    if (!listing) throw new AppError(404, 'Listing not found')
    return listing
  },

  deleteFromDB: async (_id: string, userId: string) => {
    const listing = await Listing.findById(_id)

    if (!listing) throw new AppError(404, 'Listing not found')
    if (String(listing.userID) !== userId)
      throw new AppError(401, 'You are not authorized to delete this listing')

    return await Listing.deleteOne({ _id })
  },

  updateIntoDB: async (
    id: string,
    updatedListing: Partial<IListing>,
    userId: string
  ) => {
    const listing = await Listing.findById(id)

    if (!listing) throw new AppError(404, 'Listing not found')
    if (String(listing.userID) !== userId)
      throw new AppError(401, 'You are not authorized to update this listing')

    const updatedData = flattenObject(updatedListing)

    return await Listing.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    })
      .select('title description category price status userID')
      .populate({ path: 'userID', select: 'name email phone' })
  },
}

export default ListingService

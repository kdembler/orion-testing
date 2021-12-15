const gql = require("graphql-tag");

const GET_CHANNELS_SLOW_QUERY = gql`
query GetChannels {
      channelsConnection(
        first: 100,
        orderBy: createdAt_DESC
      ) {
        __typename
        edges {
          __typename
          cursor
          node {
            __typename
            ...AllChannelFields
          }
        }
        pageInfo {
          __typename
          endCursor
          hasNextPage
        }
        totalCount
      }
    }
    fragment DataObjectFields on DataObject {
      id
      createdAt
      size
      liaison {
        ...BasicWorkerFields
        __typename
      }
      liaisonJudgement
      ipfsContentId
      joystreamContentId
      __typename
    }
    fragment BasicWorkerFields on Worker {
      id
      workerId
      metadata
      isActive
      type
      __typename
    }
    fragment BasicChannelFields on Channel {
      id
      title
      createdAt
      avatarPhotoUrls
      avatarPhotoAvailability
      avatarPhotoDataObject {
        ...DataObjectFields
        __typename
      }
      __typename
    }
    
    fragment AllChannelFields on Channel {
      __typename
      coverPhotoAvailability
      coverPhotoDataObject {
        __typename
        ...DataObjectFields
      }
      coverPhotoUrls
      description
    
      isCensored
      isPublic
      language {
        __typename
        id
        iso
      }
      ownerMember {
        __typename
        avatarUri
        handle
        id
      }
    
      ...BasicChannelFields
    }  
`

const GET_VIDEO_FAST_QUERY = gql`
query GetVideo {
    videoByUniqueInput(where:{id:"1000"}) {
        ...VideoFields
        __typename
    
    }
  }
  fragment VideoFields on Video {
    id
    title
    description
    category {
      id
      __typename
    }
  
    duration
    createdAt
    isPublic
    isExplicit
    isFeatured
    hasMarketing
    isCensored
    language {
      iso
      __typename
    }
    publishedBeforeJoystream
    mediaMetadata {
      ...VideoMediaMetadataFields
      __typename
    }
    mediaUrls
    mediaAvailability
    mediaDataObject {
      ...DataObjectFields
      __typename
    }
    thumbnailPhotoUrls
    thumbnailPhotoAvailability
    thumbnailPhotoDataObject {
      ...DataObjectFields
      __typename
    }
    channel {
      ...BasicChannelFields
      __typename
    }
    license {
      ...LicenseFields
      __typename
    }
    __typename
  }
  fragment VideoMediaMetadataFields on VideoMediaMetadata {
    id
    pixelHeight
    pixelWidth
    __typename
  }
  fragment DataObjectFields on DataObject {
    id
    createdAt
    size
    liaison {
      ...BasicWorkerFields
      __typename
    }
    liaisonJudgement
    ipfsContentId
    joystreamContentId
    __typename
  }
  fragment BasicWorkerFields on Worker {
    id
    workerId
    metadata
    isActive
    type
    __typename
  }
  fragment BasicChannelFields on Channel {
    id
    title
    createdAt
    avatarPhotoUrls
    avatarPhotoAvailability
    avatarPhotoDataObject {
      ...DataObjectFields
      __typename
    }
    __typename
  }
  fragment LicenseFields on License {
    id
    code
    attribution
    customText
    __typename
  }
`

module.exports = {
    GET_CHANNELS_SLOW_QUERY,
    GET_VIDEO_FAST_QUERY,
}

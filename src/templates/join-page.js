import React from 'react'
import PropTypes from 'prop-types'
import {withPrefix, graphql} from 'gatsby'
import {Helmet} from "react-helmet"
import Content, {HTMLContent} from '../components/Content'
import Layout from '../components/Layout'
import Header from '../components/Header'
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import envVariables from '../utils/envVariables';
import metadata from '../content/site-metadata.json'

export const JoinPageTemplate = ({
                                     seo,
                                     header,
                                     mission,
                                     hero,
                                     memberships,
                                     content,
                                     contentComponent
                                 }) => {
    const PageContent = contentComponent || Content
    return (
        <div>
            {seo &&
            <Helmet title={seo.title ? seo.title : metadata.siteMetadata.title}
                    titleTemplate={metadata.siteMetadata.titleTemplate}>
                {seo.description && <meta name="description" content={seo.description}/>}
                {seo.image && <meta name="image" content={`${withPrefix('/')}${seo.image.publicURL}`}/>}
                {seo.url && <meta property="og:url" content={seo.url}/>}
                {seo.title && <meta property="og:title" content={seo.title}/>}
                {seo.description && (
                    <meta property="og:description" content={seo.description}/>
                )}
                {seo.image && <meta property="og:image" content={`${withPrefix('/')}${seo.image.publicURL}`}/>}
                <meta name="twitter:card" content="summary_large_image"/>
                {seo.twitterUsername && (
                    <meta name="twitter:creator" content={seo.twitterUsername}/>
                )}
                {seo.title && <meta name="twitter:title" content={seo.title}/>}
                {seo.description && (
                    <meta name="twitter:description" content={seo.description}/>
                )}
                {seo.image && <meta name="twitter:image" content={`${withPrefix('/')}${seo.image.publicURL}`}/>}
            </Helmet>
            }
            <div className="wrapper project-background">
                <TopBar/>
                <Navbar/>
                <Header title={header.title} subTitle={header.subTitle}/>
            </div>

            <main className="main">
                <div className="content">
                    <section className="section join-s1-main">
                        <div className="container join-s1-container">
                            <div className="mission">
                                <p className="title">{mission.title}</p>
                                <p>{mission.description}</p>
                            </div>
                            <div className="hero">
                                <p><strong>{hero.title} : </strong>{hero.description}</p>
                            </div>
                            <div className="membership-title">
                                <h3>{memberships[0].title}</h3>
                                <p>{memberships[0].text}</p>
                                <p>{memberships[0].subTitle}</p>
                            </div>
                            <div className="columns">
                                {
                                    memberships.map((tier, index) => {
                                    return  tier.membershipsList.map((membership, index) => {
                                        return (
                                           <div className="column">
                                               <strong>{membership.name}</strong>
                                               <ul className="membership-permissions">
                                                   {
                                                       membership.features.map((feature, index) => {
                                                           return (<li>{feature.name} : {feature.permission}</li>)
                                                       })
                                                   }
                                               </ul>
                                               <a className="button" role="button"
                                                  href={`${envVariables.IDP_BASE_URL}/auth/register?client_id=${envVariables.OAUTH2_CLIENT_ID}&redirect_uri=${encodeURI(`#?membership_type=${membership.type}`)}`}>{membership.name}</a>
                                           </div>
                                        )
                                    })
                                  })
                                }

                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}

JoinPageTemplate.propTypes = {
    seo: PropTypes.object,
    header: PropTypes.object,
    mission: PropTypes.object,
    hero: PropTypes.object,
    memberships: PropTypes.array,
}

const JoinPage = ({data}) => {
    const {markdownRemark: post} = data

    return (
        <Layout>
            <JoinPageTemplate
                contentComponent={HTMLContent}
                seo={post.frontmatter.seo}
                header={post.frontmatter.header}
                mission={post.frontmatter.mission}
                hero={post.frontmatter.hero}
                memberships={post.frontmatter.memberships}
            />
        </Layout>
    )
}

JoinPage.propTypes = {
    data: PropTypes.object.isRequired,
}

export default JoinPage

export const joinPageQuery = graphql`
  query JoinPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        seo {
          title
          description
          url
          image {
            childImageSharp {
              fluid(maxWidth: 640, quality: 64) {
                ...GatsbyImageSharpFluid
              }
            }
            publicURL
          }
          twitterUsername
        }
        header {
          title
          subTitle
        }
        mission {
            title
            description
        }        
        hero {
            title
            description
        }
        memberships {
            membershipsList {
                name
                features {
                    name
                    permission
                }
            }
            title
            subTitle
            text
            note
        }
      }
    }
  }
`

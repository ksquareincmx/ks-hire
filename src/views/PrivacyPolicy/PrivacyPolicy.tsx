import React, { useRef } from 'react';
import { Grid, Link } from '@material-ui/core';
import styles from './PrivacyPolicy.module.scss';

const scrollToRef = (ref: any) => {
  window.scrollTo({
    top: ref.current.offsetTop,
    left: 0,
    behavior: 'smooth',
  });
};

const PrivacyPolicy: React.FC = () => {
  const ksquareGroup = '/assets/ksquare-group-head.png';

  document
    .querySelector('body')
    ?.setAttribute('style', 'overflow: unset');

  const section1 = useRef(null);
  const section2 = useRef(null);
  const section3 = useRef(null);
  const section4 = useRef(null);
  const section5 = useRef(null);
  const section6 = useRef(null);
  const section7 = useRef(null);
  const section8 = useRef(null);
  const section9 = useRef(null);

  return (
    <Grid container justify="center" className={styles.privacyPolicy}>
      <img
        className={styles.privacyImg}
        src={ksquareGroup}
        alt="The Ksquare Group"
      />
      <Grid item xs={12} md={7} className={styles.privacyContainer}>
        <h1>KS HIRE PRIVACY POLICY</h1>
        <p>
          This privacy policy describes the information that we
          collect about you on the KS Hire portal from which you
          linked (“Site”); how we use that information; how we protect
          it; and the choices you may make with respect to it. Except
          as specifically provided below in the Mexican and EU
          Citizens Section, this Privacy Policy does not apply to any
          other information collected by The Ksquare Group by or
          through any other means, such as information collected
          offline. When we refer to ourselves as “we" or "The Ksquare
          Group" we mean Ksquare Labs SA de CV and all of its
          subsidiary companies.
        </p>
        <p>
          <span className={styles.bold}>Mexican Citizens:</span> For
          information relating to Mexican Citizens, please click below
          on the Mexican Citizens Section.
        </p>
        <p>
          <span className={styles.bold}>EU Citizens:</span> For
          information relating to EU Citizens, please click below on
          the EU Citizens Section.
        </p>
        <p>
          Our Privacy Policy is organized in the following sections.
          For immediate access to a particular section, click on the
          title.
        </p>
        <div className={styles.tableOfContents}>
          <div className={styles.tableOfContentsContainer}>
            <p
              className={styles.tableOfContentsTitle}
              onClick={() => scrollToRef(section1)}
            >
              DATA WE COLLECT
            </p>
            <p
              className={styles.tableOfContentsTitle}
              onClick={() => scrollToRef(section2)}
            >
              HOW WE USE YOUR DATA
            </p>
            <p
              className={styles.tableOfContentsTitle}
              onClick={() => scrollToRef(section3)}
            >
              MEXICAN CITIZENS
            </p>
            <p
              className={styles.tableOfContentsTitle}
              onClick={() => scrollToRef(section4)}
            >
              EU CITIZENS
            </p>
            <p
              className={styles.tableOfContentsTitle}
              onClick={() => scrollToRef(section5)}
            >
              INDIVIDUAL RIGHTS
            </p>
            <p
              className={styles.tableOfContentsTitle}
              onClick={() => scrollToRef(section6)}
            >
              DATA RETENTION
            </p>
            <p
              className={styles.tableOfContentsTitle}
              onClick={() => scrollToRef(section7)}
            >
              SECURITY
            </p>
            <p
              className={styles.tableOfContentsTitle}
              onClick={() => scrollToRef(section8)}
            >
              CONTACT US
            </p>
            <p
              className={styles.tableOfContentsTitle}
              onClick={() => scrollToRef(section9)}
            >
              UPDATES TO OUR PRIVACY POLICY
            </p>
          </div>
        </div>
        <h3 ref={section1}>• DATA WE COLLECT</h3>
        <p>
          We collect personal data you choose to provide, through
          registrations and applications. For example, you may choose
          to provide your name, contact information, address, social
          media profiles, education, work experience, skills and
          photo.
        </p>
        <p>
          From time to time, we may use or augment the personal data
          we have about you with information obtained from other
          sources, such as public databases, social media platforms
          and other third parties. For example, we may use such
          third-party information to confirm contact or the content of
          your resume to better understand your interests, education,
          and work experience so far.
        </p>
        <p>
          If you submit any personal data relating to other people to
          us, you represent that you have the authority to do so and
          to permit us to use the information in accordance with this
          Privacy Policy.
        </p>
        <h3 ref={section2}>• HOW WE USE YOUR DATA</h3>
        <p>
          Our service allows you to apply to any job of your interest
          posted in our social media profiles. We will use your data
          to review the affinity with the job selected by you or
          determine if your profile is akin with a current job offer.
          In both cases, we will have contact with you and let you
          know all the corresponding information.
        </p>
        <h3 ref={section3}>• MEXICAN CITIZENS</h3>
        <p>
          You have the right at all times to know what personal data
          we have about you, what we use it for and the conditions of
          the use we give it (Access). Likewise, it is your right to
          request the correction of your personal information in case
          it is outdated, inaccurate or incomplete (Correction);
          likewise, you have the right to have your information
          removed from our records or databases when you consider that
          it is not being properly used (Cancellation); as well as to
          oppose the use of your personal data for specific purposes
          (Opposition). These rights are known as ARCO rights.
        </p>
        <p>
          To exercise any of the ARCO rights, you may submit the
          respective request by e-mail to:{' '}
          <Link
            href="mailto:HRMexico@theksquaregroup.com"
            className={styles.link}
          >
            HRMexico@theksquaregroup.com
          </Link>{' '}
          or you may submit the corresponding request together with a
          document that proves your identity, indicating your address
          and/or e-mail address to communicate the answer to your
          request, power of attorney or power of attorney accompanied
          by your official identification signed before two witnesses
          who must also accompany your official identification,
          directly at our address with the person responsible for the
          information Yunuen Espinoza, from Monday to Thursday, from
          10:00 a.m. to 4:00 p.m.
        </p>
        <p>
          You must submit your request in writing, clearly requiring
          either access, rectification, cancellation or opposition to
          your personal data, providing your address or an email
          through which the response to your request will be
          communicated, containing a detailed and accurate description
          of the personal data to which it refers. In case of
          requesting a data rectification, it will be necessary that
          you provide us with the new information that will replace or
          complement the previous one.
        </p>
        <p>
          The Ksquare Group will answer you, in a term no longer than
          20 (twenty) calendar days, if your request is appropriate or
          not. If it is appropriate, you must make it effective within
          15 (fifteen) calendar days. Likewise, according to the
          applicable legal provisions in force, The Ksquare Group
          shall have the right to extend the aforementioned terms
          once, with justification.
        </p>
        <p>
          The Ksquare Group will respond to your request within the
          indicated period of time through the e-mail you provide for
          such purpose. The Ksquare Group will provide electronic
          copies of the media in which your personal data is stored.
        </p>
        <p>
          You may revoke the consent that, in your case, you have
          given us for the treatment of your personal data. However,
          it is important to note that not in all cases we will be
          able to attend to your request or conclude the use
          immediately, since it is possible that by some legal
          obligation we will require to continue treating your
          personal data.
        </p>
        <p>
          To revoke your consent you must request by e-mail to the
          address:{' '}
          <Link
            href="mailto:HRMexico@theksquaregroup.com"
            className={styles.link}
          >
            HRMexico@theksquaregroup.com
          </Link>{' '}
          or you must submit the corresponding request together with a
          document that proves your identity, power of attorney or
          power of attorney accompanied by your official
          identification signed before two witnesses who must also
          accompany your official identification, directly at our
          address with the person responsible for the information
          Yunuen Espinoza, from Monday to Thursday, from 10:00 a.m. to
          4:00 p.m.
        </p>
        <p>
          If you consider that your personal data protection rights
          have been damaged by the improper processing of your
          personal data, you may file your complaint with the Privacy
          Officer of The Ksquare Group by e-mailing{' '}
          <Link
            href="mailto:johannes.schindler@theksquaregroup.com"
            className={styles.link}
          >
            johannes.schindler@theksquaregroup.com
          </Link>
          . If your complaint has not been dealt with, within a
          maximum of 72 working hours, you may file a complaint or
          corresponding report with the Federal Institute of
          Information Access and Data Protection (IFAI). For
          information, please visit{' '}
          <Link
            target="_blank"
            href="http://ifai.gob.mx"
            className={styles.link}
          >
            www.ifai.gob.mx
          </Link>
          .
        </p>
        <h3 ref={section4}>• EU CITIZENS</h3>
        <p>
          If the Holder of the data is a resident of the European
          Union, in addition to the above considerations, the General
          Data Protection Regulation (GDPR) will apply.
        </p>
        <p>
          By using this platform, you are giving your consent to The
          Ksquare Group to process your personal data under the terms
          of this Privacy Policy.
        </p>
        <p>
          If you believe your rights regarding the protection of your
          personal data have been violated, you have the right to
          appeal to the European Union's Personal Data Protection
          Authorities at any time.
        </p>
        <h3 ref={section5}>• INDIVIDUAL RIGHTS</h3>
        <p>
          If you would like to request to review, correct, or update
          personal data that you have provided to us, you may contact
          us as indicated in the Contact Us section. We will respond
          to your request consistent with applicable law. Please note
          that we may need to retain certain personal data for
          recordkeeping purposes and/or to complete any transactions
          that you began prior to requesting a change or deletion.
        </p>
        <p>
          For information relating to Mexican Citizens and EU Citizens
          see the corresponding Sections above.
        </p>
        <h3 ref={section6}>• DATA RETENTION</h3>
        <p>
          We will retain your personal data during a year in order to
          let you know any job offer that could be of your interest
          and based on your profile.
        </p>
        <p>
          You may update your personal or work data. The main contact
          option to ask for these changes, is with the recruiter you
          have been in contact or you can do it by sending an email to{' '}
          <Link
            href="mailto:HRMexico@theksquaregroup.com"
            className={styles.link}
          >
            HRMexico@theksquaregroup.com
          </Link>
          .
        </p>
        <h3 ref={section7}>• SECURITY</h3>
        <p>
          We implement security safeguards designed to protect your
          data, such as HTTPS. We regularly monitor our systems for
          possible vulnerabilities and attacks. However, we cannot
          warrant the security of any information that you send us.
          There is no guarantee that data may not be accessed,
          disclosed, altered or destroyed by breach of any of our
          physical, technical, or managerial safeguards.
        </p>
        <h3 ref={section8}>• CONTACT US</h3>
        <p>
          The company responsible for collection, use and disclosure
          of your personal data under this Privacy Policy is Ksquare
          Labs.
        </p>
        <p>
          If you would like to exercise any individual rights, please
          contact us by sending an email to{' '}
          <Link
            href="mailto:HRMexico@theksquaregroup.com"
            className={styles.link}
          >
            HRMexico@theksquaregroup.com
          </Link>
          . We will respond to your request consistent with applicable
          law.
        </p>
        <p>
          If you have questions about this Privacy Policy, please
          contact us by emailing the Privacy Officer Johannes
          Schindler,{' '}
          <Link
            href="mailto:johannes.schindler@theksquaregroup.com"
            className={styles.link}
          >
            johannes.schindler@theksquaregroup.com
          </Link>{' '}
          or write to the following address:
        </p>
        <p className={styles.addressLine}>Ksquare Labs SA de CV</p>
        <p className={styles.addressLine}>Privacy Officer</p>
        <p className={styles.addressLine}>Calle 33 #488-A x50 y 52</p>
        <p className={styles.addressLine}>Col. Perez Ponce</p>
        <p className={styles.addressLine}>Centro-Sec 3</p>
        <p className={styles.addressLine}>C.P. 97205</p>
        <p className={styles.addressLine}>Merida, Yucatan</p>
        <h3 ref={section9}>• UPDATES TO OUR PRIVACY POLICY</h3>
        <p>
          From time to time, we may update this Privacy Policy. Any
          changes will be effective when we post the revised Privacy
          Policy. This Privacy Policy was last updated as of the
          effective date listed above. If the Privacy Policy changes
          in a way that significantly affects how we handle personal
          data, we will not use the personal data we previously
          gathered in the manner described in the new policy without
          providing notice and/or obtaining your consent, as
          appropriate. Minor changes to the policy may occur that will
          not significantly affect our use of personal data without
          notice or consent. We encourage you to periodically review
          this page for the latest information on our privacy
          practices.
        </p>
      </Grid>
    </Grid>
  );
};

export default PrivacyPolicy;

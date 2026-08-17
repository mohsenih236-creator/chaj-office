import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { StudioInfo, Language } from '../types';
import {
  X,
  Send,
  MapPin,
  Phone,
  Mail,
  CheckCircle2
} from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  studioInfo: StudioInfo;
  language: Language;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  studioInfo,
  language
}) => {
  const isFa = language === 'FA';

  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Residential',
    location: '',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSending) return;

    setIsSending(true);
    setError('');

    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        projectType: formData.projectType,
        location: formData.location,
        message: formData.message
      };

      await emailjs.send(
        'service_nw30ena',
        'template_fdeiw1i',
        templateParams,
        {
          publicKey: 'hg-_4jqdQOPzMqag2'
        }
      );

      setSubmitted(true);

      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: 'Residential',
        location: '',
        message: ''
      });
    } catch (err) {
      console.error('EmailJS Error:', err);

      setError(
        isFa
          ? 'ارسال درخواست با مشکل مواجه شد. لطفاً دوباره تلاش کنید.'
          : 'Something went wrong while sending your inquiry. Please try again.'
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">

      <div className="bg-[#F4F1EE] border border-black/20 w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-10 relative shadow-2xl">

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 text-[#8C8C8C] hover:text-[#1C1C1C] cursor-pointer transition-colors"
          type="button"
          aria-label={isFa ? 'بستن' : 'Close'}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Title */}
        <div className="mb-8">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-[#8C8C8C] block mb-1">
            {isFa
              ? 'ارتباط با گروه معماری چاج'
              : 'STUDIO CONTACT & INQUIRIES'}
          </span>

          <h2 className="text-3xl font-light italic text-[#1C1C1C] font-serif">
            {isFa
              ? 'تماس و سفارش پروژه'
              : 'Initiate Project Dialogue'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column: Form */}
          <div className="md:col-span-7">

            {submitted ? (

              /* ================= SUCCESS MESSAGE ================= */
              <div className="p-8 bg-[#F4F1EE] border border-black/20 text-center my-8">

                <CheckCircle2 className="w-12 h-12 text-[#1C1C1C] mx-auto mb-4" />

                <h3 className="text-2xl font-serif italic text-[#1C1C1C] mb-2">
                  {isFa
                    ? 'درخواست شما با موفقیت ارسال شد'
                    : 'Inquiry Received'}
                </h3>

                <p className="text-xs text-[#4A4A4A] italic leading-relaxed mb-6">
                  {isFa
                    ? 'با تشکر از پیام شما. درخواست شما با موفقیت دریافت شد و همکاران گروه معماری چاج در اسرع وقت با شما تماس خواهند گرفت.'
                    : 'Thank you for reaching out. Your inquiry has been successfully received and our team will contact you shortly.'}
                </p>

                <button
                  onClick={handleClose}
                  type="button"
                  className="px-6 py-2.5 bg-[#1C1C1C] text-[#F4F1EE] font-sans text-[10px] uppercase tracking-[0.25em] font-bold cursor-pointer hover:opacity-80 transition-opacity"
                >
                  {isFa ? 'بستن پنجره' : 'Close Window'}
                </button>

              </div>

            ) : (

              /* ================= CONTACT FORM ================= */
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >

                {/* Name */}
                <div>
                  <label className="font-sans text-[10px] uppercase tracking-[0.25em] font-bold text-[#8C8C8C] block mb-1">
                    {isFa
                      ? 'نام و نام خانوادگی'
                      : 'Full Name *'}
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value
                      })
                    }
                    className="w-full p-2.5 bg-[#F4F1EE] border border-black/15 font-sans text-xs focus:outline-none focus:border-[#1C1C1C]"
                    placeholder={
                      isFa
                        ? 'مثال: علی رضایی'
                        : 'e.g. Eleanor Vance'
                    }
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* Email */}
                  <div>
                    <label className="font-sans text-[10px] uppercase tracking-[0.25em] font-bold text-[#8C8C8C] block mb-1">
                      {isFa
                        ? 'پست الکترونیک'
                        : 'Email Address *'}
                    </label>

                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value
                        })
                      }
                      className="w-full p-2.5 bg-[#F4F1EE] border border-black/15 font-sans text-xs focus:outline-none focus:border-[#1C1C1C]"
                      placeholder="email@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="font-sans text-[10px] uppercase tracking-[0.25em] font-bold text-[#8C8C8C] block mb-1">
                      {isFa
                        ? 'شماره تماس'
                        : 'Phone Number'}
                    </label>

                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value
                        })
                      }
                      className="w-full p-2.5 bg-[#F4F1EE] border border-black/15 font-sans text-xs focus:outline-none focus:border-[#1C1C1C]"
                      placeholder="+98 ..."
                    />
                  </div>

                </div>

                {/* Project Type + Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* Project Type */}
                  <div>
                    <label className="font-sans text-[10px] uppercase tracking-[0.25em] font-bold text-[#8C8C8C] block mb-1">
                      {isFa
                        ? 'نوع پروژه'
                        : 'Project Type'}
                    </label>

                    <select
                      value={formData.projectType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          projectType: e.target.value
                        })
                      }
                      className="w-full p-2.5 bg-[#F4F1EE] border border-black/15 font-sans text-xs focus:outline-none focus:border-[#1C1C1C]"
                    >
                      <option value="Residential">
                        {isFa ? 'مسکونی' : 'Residential'}
                      </option>

                      <option value="Cultural">
                        {isFa
                          ? 'فرهنگی / عمومی'
                          : 'Cultural'}
                      </option>

                      <option value="Interior">
                        {isFa
                          ? 'معماری داخلی'
                          : 'Interior Architecture'}
                      </option>

                      <option value="Masterplan">
                        {isFa
                          ? 'طراحی شهری / مسترپلن'
                          : 'Masterplan'}
                      </option>
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="font-sans text-[10px] uppercase tracking-[0.25em] font-bold text-[#8C8C8C] block mb-1">
                      {isFa
                        ? 'شهر / موقعیت زمین'
                        : 'Site Location'}
                    </label>

                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          location: e.target.value
                        })
                      }
                      className="w-full p-2.5 bg-[#F4F1EE] border border-black/15 font-sans text-xs focus:outline-none focus:border-[#1C1C1C]"
                      placeholder={
                        isFa
                          ? 'مثال: لواسان، تهران'
                          : 'e.g. Yazd, Iran'
                      }
                    />
                  </div>

                </div>

                {/* Message */}
                <div>
                  <label className="font-sans text-[10px] uppercase tracking-[0.25em] font-bold text-[#8C8C8C] block mb-1">
                    {isFa
                      ? 'توضیحات و خواسته شما'
                      : 'Project Vision & Brief *'}
                  </label>

                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message: e.target.value
                      })
                    }
                    className="w-full p-2.5 bg-[#F4F1EE] border border-black/15 font-sans text-xs focus:outline-none focus:border-[#1C1C1C]"
                    placeholder={
                      isFa
                        ? 'توضیحات مختصر در مورد متراژ، کاربری و اهداف...'
                        : 'Brief description of area, budget, schedule, or conceptual aspirations...'
                    }
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 border border-red-300 bg-red-50 text-red-700 text-xs font-sans">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSending}
                  className={`mt-2 py-3 px-6 bg-[#1C1C1C] text-[#F4F1EE] font-sans text-[10px] uppercase tracking-[0.25em] font-bold transition-opacity flex items-center justify-center gap-2 ${
                    isSending
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:opacity-80 cursor-pointer'
                  }`}
                >

                  {isSending ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-[#F4F1EE] border-t-transparent rounded-full animate-spin" />

                      <span>
                        {isFa
                          ? 'در حال ارسال...'
                          : 'Sending...'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />

                      <span>
                        {isFa
                          ? 'ارسال درخواست'
                          : 'Send Inquiry'}
                      </span>
                    </>
                  )}

                </button>

              </form>
            )}

          </div>

          {/* Right Column: Office Locations */}
          <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-black/15 pt-6 md:pt-0 md:pl-8 flex flex-col gap-6">

            <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-[#8C8C8C]">
              {isFa
                ? 'دفاتر و آزمایشگاه‌های میدانی'
                : 'Studio Locations'}
            </h4>

            {studioInfo.offices.map((office) => (
              <div
                key={office.cityEn}
                className="p-4 bg-[#E8E4E0]/60 border border-black/10 text-xs flex flex-col gap-2"
              >

                {/* City */}
                <div className="font-serif italic text-sm text-[#1C1C1C]">
                  {isFa
                    ? office.cityFa
                    : office.cityEn}
                </div>

                {/* Address */}
                <div className="flex items-start gap-2 text-[#4A4A4A]">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#1C1C1C]" />

                  <span>
                    {isFa
                      ? office.addressFa
                      : office.addressEn}
                  </span>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-2 text-[#4A4A4A]">
                  <Phone className="w-3.5 h-3.5 shrink-0 text-[#1C1C1C]" />

                  <span className="font-sans">
                    {office.phone}
                  </span>
                </div>

                {/* Email */}
                <div className="flex items-center gap-2 text-[#4A4A4A]">
                  <Mail className="w-3.5 h-3.5 shrink-0 text-[#1C1C1C]" />

                  <span className="font-sans">
                    {office.email}
                  </span>
                </div>

              </div>
            ))}

          </div>

        </div>
      </div>
    </div>
  );
};
